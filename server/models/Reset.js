const pool = require("../db/pool");

class Reset {
  static async initiateReset(email, otp) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      // Check if the user exists
      const userCheckQuery = "SELECT * FROM users WHERE email = $1";
      const userCheckResult = await client.query(userCheckQuery, [email]);
      if (userCheckResult.rows.length === 0) {
        throw new Error("User does not exist");
      }
      // Invalidate existing OTP, if any
      const invalidateQuery = "DELETE FROM password_resets WHERE email = $1";
      await client.query(invalidateQuery, [email]);
      // Insert new OTP
      const queryText =
        "INSERT INTO password_resets (email, otp) VALUES ($1, $2)";
      await client.query(queryText, [email, otp]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async verifyReset(email, getOtp) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const queryText =
        "SELECT otp, created_at FROM password_resets WHERE email = $1";
      const result = await client.query(queryText, [email]);
      if (result.rows.length === 0) {
        throw new Error("No OTP found for this email");
      }
      console.log("Result", result.rows[0]);
      const { otp, created_at } = result.rows[0];
      console.log("OTP", getOtp);
      console.log("Stored OTP", otp);
      if (otp !== getOtp) {
        throw new Error("Invalid OTP");
      }
      const expirationTime = 2 * 60 * 1000; // 2 minutes in milliseconds
      const now = new Date().getTime();
      const otpAge = now - new Date(created_at).getTime();
      if (otpAge > expirationTime) {
        throw new Error("OTP expired");
      }
      await client.query("COMMIT");
      return "OTP is valid. Proceed with password reset";
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }

  static async resetPassword(email, password) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");
      const queryText = "UPDATE users SET password = $1 WHERE email = $2";
      await client.query(queryText, [password, email]);
      await client.query("COMMIT");
    } catch (error) {
      await client.query("ROLLBACK");
      throw error;
    } finally {
      client.release();
    }
  }
}

module.exports = Reset;
