class AuthService {
    static async checkToken(token) {
      const isValid = await new Promise((res) => {
        setTimeout(() => {
            if (Math.random() < 1) {
                res(true);
            } else {
                res(false);
            }
        }, 1000);
      });

      return isValid;
    }
}

export default AuthService;