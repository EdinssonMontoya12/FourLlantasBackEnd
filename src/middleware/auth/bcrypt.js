import bcrypt from "bcryptjs"

const encryptPassword = async (contrasena) => {
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(contrasena, salt)

    return hash
}

const matchPassword =  async (contrasena, contrasenaIgresada) => {
    try {
        let comparar = await bcrypt.compare(contrasena, contrasenaIgresada)
        return comparar
    } catch(e) {
        console.log(e)
    }
}

export  {
    encryptPassword,
    matchPassword
}