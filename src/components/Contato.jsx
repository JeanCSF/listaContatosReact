import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faDeleteLeft, faPhoneVolume, faUserAlt } from "@fortawesome/free-solid-svg-icons"
import "./Contato.css"


export default function Contato(props) {
    return (
        <div className="card ms-3 text-center contato my-2">
            <div className="row">
                <div className="row ms-3 text-end">
                    <h5>
                        <FontAwesomeIcon icon={faDeleteLeft}
                            onClick={() => { props.remover(props.id) }}
                            className="delete"
                        />
                    </h5>
                </div>
                <div className="row text-center contato-foto">
                    <FontAwesomeIcon className="" style={{ fontSize: "50px" }} icon={faUserAlt} />
                </div>
                <div className="row text-center">
                    <h3>{props.nome}</h3>
                </div>
                <div className="row text-center">
                    <h6>
                        <FontAwesomeIcon className="me-2" icon={faPhoneVolume} />
                        {props.telefone}
                    </h6>
                </div>
            </div>
        </div>
    )
}