// assumes a file mail.json is in the current directory
const tosql = (name) => {
    console.log(`DELETE FROM ${name};`);
    const values = require(`./${name}.json`);
    for (value of values) {
      const blob = JSON.stringify(value).replace(/'/g, `''`);
      console.log(
          `INSERT INTO ${name}(${name}) VALUES ('${blob}');`);
    }
  };
  tosql('category');
//   tosql('member');