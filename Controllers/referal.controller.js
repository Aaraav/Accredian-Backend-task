const prisma = require('../DB/db.config'); 
const nodemailer=require('nodemailer');
const referal = async (req, res) => {
  const { my_email, my_name, user_email } = req.body;
console.log('user_email',user_email);
  try {
    const referrer = await prisma.user.findUnique({
      where: {
        email: my_email,
      },
    });
console.log('referrer',referrer);
    if (!referrer) {
      return res.status(404).json({ error: 'Referrer not found' });
    }

    const referee = await prisma.user.findUnique({
      where: {
        email: user_email,
      },
    });
console.log('referee',referee);
    if (!referee) {
      return res.status(404).json({ error: 'Referee not found' });
    }


    const existingReferral = await prisma.referal.findFirst({
        where: {
          AND: [
            { referrerId: referrer.id },
            { refereeId: referee.id },
          ],
        },
      });
  
      if (existingReferral) {
        return res.status(400).json({ error: 'Referral already given' });
      }

    const referralGiven = await prisma.referal.create({
      data: {
        referrerId: referrer.id,
        refereeId: referee.id,
      },
    });

    const referralReceived = await prisma.referal.create({
      data: {
        referrerId: referee.id, 
        refereeId: referrer.id,
      },
    });
if(referralGiven &&  referralReceived){
    const transporter = nodemailer.createTransport({
        service:'gmail',
        secure:true,
        port: 465,
        auth: {
          user: 'aaraav2810@gmail.com'   ,
          pass: "qwco rlue iunw ryak",
        },
        tls: {
            rejectUnauthorized: false 
        }
      });

      const info = await transporter.sendMail({
        from: my_email, // sender address
        to: `aaraav10@gmail.com,${user_email}`, 
        subject: "Referal Information", 
        text: `Dear Recipient,

You have been referred to our service. We are excited to connect with you and provide more information about what we offer.

Please feel free to reach out to us at accerdian for any questions or further details.

Best regards,
${my_name}
`, 
});
   
console.log('Email sent:', info);

        transporter.sendMail(info,(e,email)=>{
            if(e) throw e;
            console.log('success');
            console.log(email);
            res.json(email);
                        
          })

        }


    

    res.json({ message: 'Referral recorded successfully' });
  } catch (error) {
    console.error('Error creating referral:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {referal};
