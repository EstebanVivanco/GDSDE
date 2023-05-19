
class footerinBombin extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `
        <footer class="text-center text-white" id="submit-btn" style="bottom: 0; width: 100%; margin-top: auto;">
        <div class="container p-2 mb-0 pb-0" style="margin-top: 1%;">
            <div class="row">

                <div class="col-lg-4">
                    <h5>Dirección de la empresa</h5>
                    <p> Picarquin, Pasaje 1 - #1388 </p>
                </div>

                <div class="col-lg-4">

                    <section class="mb-4">
                        <!-- Facebook -->
                        <a class="btn btn-outline-light btn-floating m-1 rounded-circle" href="#!" role="button"
                            ><i class="fab fa-facebook-f"></i
                        ></a>
                
                        <!-- Google -->
                        <a class="btn btn-outline-light btn-floating m-1 rounded-circle" href="#!" role="button"
                            ><i class="fab fa-google"></i
                        ></a>
                
                        <!-- Instagram -->
                        <a class="btn btn-outline-light btn-floating m-1 rounded-circle" href="#!" role="button"
                            ><i class="fab fa-instagram"></i
                        ></a>

                        <!-- Linkedin -->
                        <a class="btn btn-outline-light btn-floating m-1 rounded-circle" href="#!" role="button"
                            ><i class="fab fa-linkedin-in"></i
                        ></a>
                    </section>

                </div>

                <div class="col-lg-4">
                    <h5>Correo Soporte</h5>
                    <p>gestor.salas@cliente.com </p>
                </div>

                
            </div>

        </div>
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
            © 2023 Copyright: Gestor de salas, derechos reservados
        </div>
    </footer>

        `;
    }
}

window.customElements.define("fotin-bombin", footerinBombin);

