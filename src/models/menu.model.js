const client = require("../common/connect");
const moment = require("moment");

const Menu = (menu) => {
  this.id = menu.id;
  this.question = menu.question;
  this.menu1 = menu.menu1;
  this.menu2 = menu.menu2;
  this.menu3 = menu.menu3;
  this.time_date = menu.time_date;
  this.selected = menu.selected;
};

Menu.get_all = async () => {
  try {
    const res = await client.query(
      "SELECT *, time_date AT TIME ZONE 'Asia/Ho_Chi_Minh' AT TIME ZONE 'UTC' AS convert_time_date FROM menu ORDER BY time_date DESC"
    );
    return JSON.stringify({ success: true, data: res?.rows, error: null });
  } catch (error) {
    return JSON.stringify({ success: false, data: null, error: error });
  }
};

Menu.add = async (data) => {
  if (!Object.keys(data).length)
    return JSON.stringify({
      success: false,
      data: null,
      error: "body empty",
    });

  const currentDate = moment().format("YYYY-MM-DD");
  try {
    const checkDateExists = await client.query(
      `SELECT count(*) FROM menu a WHERE a.time_date = '${currentDate}'`
    );
    if (checkDateExists?.rows?.[0]?.count === "0") {
      const res = await client.query(
        `INSERT INTO menu (question, menu1, menu2, menu3, time_date, selected, rate) VALUES ('${data?.question}', '${data?.menu1}', '${data?.menu2}', '${data?.menu3}', '"${currentDate}"', 0, 0)`
      );

      return JSON.stringify({
        success: true,
        data: res?.rows?.[0],
        error: null,
      });
    } else {
      return JSON.stringify({
        success: false,
        data: null,
        error: "Hôm nay tạo menu rồi còn đâu má ????",
      });
    }
  } catch (error) {
    return JSON.stringify({ success: false, data: null, error: error });
  }
};

Menu.update = async (id, data) => {
  if (!Object.keys(data).length)
    return JSON.stringify({
      success: false,
      data: null,
      error: "body empty",
    });

  try {
    let arrField = Object.keys(data);
    arrField.forEach((e, i, arr) => {
      arr[i] = `${e} = ${data[e]}`;
    });

    await client.query(
      `UPDATE menu SET ${arrField.join(", ")} WHERE id = '${id}'`
    );
    return JSON.stringify({ success: true, data: null, error: null });
  } catch (error) {
    return JSON.stringify({ success: false, data: null, error: error });
  }
};

module.exports = Menu;
