import { useContext, useState } from "react"
import Input from "../../form/Input"
import styles from "../../form/Form.module.css"
import { Link } from "react-router-dom"

//context
import { Context } from "../../../context/UserContext"


function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)


    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    function handleSubmit(e) {
        e.preventDefault()
        //send user to db
       register(user)
    }

    return (
        <section className={styles.form_container}>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o nome"
                    handleOnChange={handleChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o e-mail"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o telefone"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}
                />
                <Input
                    text="Corfimar senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Confimar senha"
                    handleOnChange={handleChange}
                />
                <input type="submit" value="Cadastar-se" />
            </form>
            <p> Já possui uma conta? <Link to="/login">Clique aqui!</Link></p>
        </section>
    )
}

export default Register