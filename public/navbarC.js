class navbinBombin extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        this.innerHTML = `    
        <nav class="navbar navbar-expand-lg navbar-dark morado" >
        <div class="container-fluid">
            <a class="navbar-brand m-l-50" href="#"><img src="/logo.png" height="50px" alt=""></a>
            <button onclick="openNav()" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span  class="fa-solid fa-bars fs-1" style="color: #ffffff;"></span>

            </button>
            
            <div class="navbar-collapse justify-content-end" id="navbarNav" style="display: none;">

                <ul class="navbar-nav px-5">
                    

                    <li class="nav-item mx-2">
                        <a class="nav-link text-light fs-5" href="/inicio"><i class="fa-solid fa-house" style="color: #ffffff;"></i> INICIO </a>
                    </li>

                    <li class="nav-item mx-2">
                        <a class="nav-link text-light fs-5" href="/registros"><i class="fa-regular fa-address-card" style="color: #ffffff;"></i> REGISTROS </a>
                    </li>

                    <li class="nav-item mx-2">
                        <a class="nav-link text-light fs-5" href="/crudusuario"><i class="fa-regular fa-user" style="color: #ffffff;"></i> USUARIOS </a>
                    </li>

                    <li class="nav-item mx-2">
                        <a class="nav-link text-light fs-5" href="/crudtipo"><i class="fa-regular fa-address-book" style="color: #ffffff;"></i> TIPOS USUARIOS </a>
                    </li>

                    <li class="nav-item mx-2">
                        <a class="nav-link text-light fs-5" href="/crudsalas"><i class="fa-solid fa-people-roof" style="color: #ffffff;"></i> SALAS </a>
                    </li>

                    <li class="nav-item mx-2">
                        <a class="nav-link text-light fs-5" href="/logout"><i class="fa-solid fa-arrow-right-from-bracket" style="color: #ffffff;"></i> CERRAR SESION </a>
                    </li>

                    
                </ul>
            </div>
        </div>
    </nav>


    <div id="mySidenav" class="sidenav">
        <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">&times;</a>
        <ul class="navbar-nav px-5">
                    

            <li class="nav-item mx-2">
                <a class="nav-link text-light fs-5" href="/inicio"><i class="fa-solid fa-house" style="color: #ffffff;"></i> INICIO </a>
            </li>

            <li class="nav-item mx-2">
                <a class="nav-link text-light fs-5" href="/registros"><i class="fa-regular fa-address-card" style="color: #ffffff;"></i> REGISTROS </a>
            </li>

            <li class="nav-item mx-2">
                <a class="nav-link text-light fs-5" href="/crudusuario"><i class="fa-regular fa-user" style="color: #ffffff;"></i> USUARIOS </a>
            </li>

            <li class="nav-item mx-2">
                <a class="nav-link text-light fs-5" href="/crudtipo"><i class="fa-regular fa-address-book" style="color: #ffffff;"></i> TIPOS USUARIOS </a>
            </li>

            <li class="nav-item mx-2">
                <a class="nav-link text-light fs-5" href="/crudsalas"><i class="fa-solid fa-people-roof" style="color: #ffffff;"></i> SALAS </a>
            </li>

            <li class="nav-item mx-2">
                <a class="nav-link text-light fs-5" href="/logout"><i class="fa-solid fa-arrow-right-from-bracket" style="color: #ffffff;"></i> CERRAR SESION </a>
            </li>
        </ul>
    </div>`;
    }
}

window.customElements.define("nabin-bombin", navbinBombin);

