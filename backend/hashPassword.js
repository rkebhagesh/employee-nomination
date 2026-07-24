const bcrypt = require("bcryptjs");

async function hash() {
    const password = "123456";

    const hash = await bcrypt.hash(password, 10);

    console.log(hash);
}

hash();

//$2b$10$Sjca7pb6N9GGerKEnZixZuPmn71oVlUjwi7U5H41SI4gKLv6t9Rq6