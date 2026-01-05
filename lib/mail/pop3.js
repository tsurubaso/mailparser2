import POP3Client from "poplib";

export function connectPop3() {
  return new Promise((resolve, reject) => {
    const client = new POP3Client(
      110,
      "pop.job-c.co.jp",
      {
        enabletls: false,
        debug: true,
      }
    );

    client.on("error", err => reject(err));

    client.on("connect", () => {
      client.login(
        process.env.EMAIL_USER,
        process.env.EMAIL_PASSWORD
      );
    });

    client.on("login", status => {
      if (!status) return reject(new Error("POP3 login failed"));
      resolve(client);
    });
  });
}
