// const { body } = require('express-validator');
// const User = require('../models/user')


// exports.register = async (req, res, next) =>{

//     const NIM  = req.body.NIM;
//     const no_registration = req.body.no_registration;
//     const first_name = req.body.first_name;
//     const last_name = req.body.last_name;
//     const password = req.body.password;

//     const oldUser = await User.findOne({no_registration:no_registration})
//     console.log("user old:", oldUser.NIM)
//     if(oldUser.NIM === NIM  || oldUser.no_registration == no_registration){
//       res.json({
//         "message" :"user sudah ada"
//       })
//     }
//     else if(oldUser.NIM !== NIM  || oldUser.no_registration !== no_registration){
//       const Posting = new User({
//           uid: 1,
//           NIM: NIM,
//           no_registration: no_registration,
//           first_name: first_name,
//           last_name: last_name,
//           password: password
//       })

//       Posting.save() // menyimpan data ke database
//       .then(
//           result =>{
//               res.status(201).json({
//                   message: "Registration Success",
//                   data: result
//                 })
//           }
//       )
//       .catch( err =>{
//           console.log('error:', err)
//       })
//     }
// }


// exports.login = async (req,res)=>{
//     try {
//       const user = await User.findOne({no_registration:req.body.no_registration})
//       console.log("user:",user)
//       !user && res.status(404).json('user not found')
//       const password = await User.findOne({password:req.body.password})
//       !password && res.status(400).json('wrong password')

//       res.status(200).send({message:'success login',datas:user})
//     } catch (e) {
//       console.log("error:",e)
//     }
//   }

const { body } = require('express-validator');
const User = require('../models/user')


exports.register = async (req, res, next) =>{

    const no_telepon  = req.body.no_telepon;
    const nama = req.body.nama;
    const kata_sandi = req.body.kata_sandi;

    
    const oldUser = await User.findOne({no_telepon:no_telepon}) || null
    console.log("old user:", oldUser)
    
    if(oldUser){
         res.json({
        "message" :"user sudah ada"
      })
    }
    else{
      const Posting = new User({
          // uid: 1,
          no_telepon: no_telepon,
          nama: nama,
          kata_sandi: kata_sandi
      })

      Posting.save() // menyimpan data ke database
      .then(
          result =>{
              res.status(201).json({
                  message: "Registration Success",
                  data: result
                })
          }
      )
      .catch( err =>{
          console.log('error:', err)
      })
    }
}


exports.login = async (req,res)=>{
    try {
      const user = await User.findOne({no_telepon:req.body.no_telepon})
      console.log("user:",user)
      !user && res.status(404).json('user not found')
      const kata_sandi = await User.findOne({kata_sandi:req.body.kata_sandi})
      !kata_sandi && res.status(400).json('kata_sandi salah')

      res.status(200).send({message:'success login',data:user})
    } catch (e) {
      console.log("error:",e)
    }
  }