const { request, expect } = require('@playwright/test');

class APIHelper {
  async validateFormCreation(apiUrl, token) {
    const context = await request.newContext();

    const response = await context.get(apiUrl, {
      headers: { Authorization: `Bearer ${token}` },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('name');
  }
}

module.exports = { APIHelper };
