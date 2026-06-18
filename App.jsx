import './App.css'

function App() {

  return (

    <div className="container">

      <div className="card">

        <div className="logo">

          <div className="circle"></div>

          <h1>Cadastre-se</h1>

        </div>

        <h2>Crie sua conta</h2>

        <p>

          Cadastre-se para acessar o sistema.

        </p>

        <div className="input-group">

          <label>Usuário</label>

          <input
            type="text"
            placeholder="Digite seu usuário"
          />

        </div>


        <div className="input-group">

          <label>Email</label>

          <input
            type="email"
            placeholder="Digite seu email"
          />

        </div>


        <div className="input-group">

          <label>Senha</label>

          <input
            type="password"
            placeholder="Digite sua senha"
          />

        </div>


        <button>

          Cadastrar

        </button>

      </div>

    </div>

  )

}

export default App