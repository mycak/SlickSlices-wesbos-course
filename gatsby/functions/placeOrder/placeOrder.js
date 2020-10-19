const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `
  <div>
   <h2>Your order for ${total}!</h2>
   <p>Your order will be ready in 40 min.</p>
   <ul>
   ${order
     .map(
       (item) => `<li>
     <img src="${item.thumbnail}" alt="${item.name}">
     ${item.size} ${item.name} - ${item.price}
      </li>
      `
     )
     .join('')};
   </ul>
   <p>Total: $${total} with pick up.</p>
  </div>
  `;
}

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  if (body.bottrap) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: 'Treeeellleee morellleee' }),
    };
  }
  const requireFields = ['email', 'name', 'order'];
  for (const field of requireFields) {
    if (!body[field]) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: `Oops ! You are missing ${field}` }),
      };
    }
  }

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: `Order list is empty` }),
    };
  }

  const info = await transporter.sendMail({
    from: 'SLICK <slick@example.com>',
    to: `${body.name} - <${body.email}>`,
    subject: 'new order',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Succcess' }),
  };
};
