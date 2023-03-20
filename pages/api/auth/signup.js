import conn from '../../../databases/conn';
import Users from '../../../model/schema';
import { hash } from 'bcryptjs';
export default async function handle(req, res) {
    conn().catch(err => res.json({ error: "เชื่อมฐานข้อมูลไม่สำเร็จ" }))

    if (req.method === 'POST') {
        if (!req.body) return res.status(400).json({ error: "Don't have form Data" })
        const { username, email, password } = req.body

        // check ข้อมูลซ้ำ
        const checkexisting = await Users.findOne({ email })
        if (checkexisting) return res.status(422).json({ message: "User Already Exists...!" })

        //hash password
        Users.create({ username, email, password: await hash(password, 12) })
            .then((data) => res.status(201).json({ user: data }))
            .catch((err) => res.status(404).json({ err }))

    } else {
        res.status(500).json({ message: "HTTP method not vaild only " })
    }
}