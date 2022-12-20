import React, { useState, useRef, useEffect } from "react"
import Contato from "./components/Contato"
import { v4 as chave } from "uuid"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faTrash } from "@fortawesome/free-solid-svg-icons"
export default function App() {

    //states
    const [contato, setContato] = useState({ id: '', nome: '', telefone: '' })
    const [listaContatos, setListaContatos] = useState([])

    //ref
    const inputNome = useRef()
    const inputTelefone = useRef()

    //métodos
    function definirNome(e) {
        setContato({ ...contato, nome: e.target.value })
    }

    function definirTelefone(e) {
        setContato({ ...contato, telefone: e.target.value })
    }

    function adicionarContato() {
        //validação dos campos
        if (contato.nome === "" || contato.telefone === "") return

        //verifica se o contato já existe
        let duplicado = listaContatos.find((ct) => ct.nome === contato.nome && ct.telefone === contato.telefone)
        if (typeof duplicado !== 'undefined') {
            inputTelefone.current.focus()
            return
        }

        //adiciona contatos
        setListaContatos([...listaContatos, { ...contato, id: chave() }])

        //limpar campos depois de adicionar contato
        setContato({ nome: '', telefone: '' })

        //focus no input de nome
        inputNome.current.focus()
    }

    function enterAdicionar(e) {
        if (e.code === 'Enter') {
            adicionarContato()
        }
    }

    //carregar a lista do localstorage
    useEffect(() => {
        if (localStorage.getItem('meus_contatos') != null) {
            setListaContatos(JSON.parse(localStorage.getItem('meus_contatos')))
        }
    }, [])

    //persistencia dos states
    //armazenar a lista de contatos no local storage
    useEffect(() => {
        localStorage.setItem('meus_contatos', JSON.stringify(listaContatos))
    }, [listaContatos])

    //limpar toda a lista
    function limparStorage() {
        setListaContatos([])
    }

    //remover um contato
    function removerContato(id) {
        let tmp = listaContatos.filter(ct => ct.id !== id)
        setListaContatos(tmp)
    }

    return (
        <>
            <div className="container-fluid titulo">
                <div className="row">
                    <div className="col text-center">
                        <h3 className="text-center">LISTA DE CONTATOS</h3>
                    </div>
                </div>
            </div>
            <div className="container-fluid formulario">
                <div className="row">
                    <div className="col p-3">
                        <div className="row justify-content-center">
                            <div className="col-10 col-sm-8 col-md-6 col-lg-4">
                                <div className="mb-3">
                                    <label className="form-label">Nome: </label>
                                    <input className="form-control" type="text" ref={inputNome} onChange={definirNome} value={contato.nome} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Telefone: </label>
                                    <input className="form-control" onKeyUp={enterAdicionar} type="text" ref={inputTelefone} onChange={definirTelefone} value={contato.telefone} />
                                </div>
                                <div className="row mt-3">
                                    <div className="col text-start">
                                        <button className="btn btn-sm btn-danger" onClick={limparStorage}><FontAwesomeIcon icon={faTrash} className="me-2"/>Limpar Lista</button>
                                    </div>
                                    <div className="col text-end">
                                        <button className="btn btn-sm btn-success" onClick={adicionarContato}><FontAwesomeIcon icon={faAdd} className="me-2" />Adicionar Contato</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
                                    {listaContatos.map(ct => {
                                        return <Contato key={ct.id} id={ct.id} nome={ct.nome} telefone={ct.telefone} remover={removerContato} />
                                    })}
        </>
    )
}