import React from 'react'
import Styles from './Footer.module.css'

function Footer() {
    return (
        <footer>
            <div class={Styles.container_footer} id='sobrenos'>
                <div class={Styles.row_footer}>
                    <div class={Styles.footer_col}>
                        <h4>Empresa</h4>
                        <ul>
                            <li><a href=""> Quem somos </a></li>
                            <li><a href=""> Nossos serviços </a></li>
                            <li><a href=""> Política de privacidade </a></li>
                            <li><a href=""> Programa de afiliados</a></li>
                        </ul>
                    </div>
                    <div class={Styles.footer_col}>
                    </div>
                    <div class={Styles.footer_col}>
                    </div>
                    <div class={Styles.footer_col}>
                        <h4>Siga-nos nas redes sociais!</h4>
                        <div class={Styles.form_sub}>
                        </div>

                        <div class={Styles.medias_socias}>
                            <a href="https://www.facebook.com/"> <i class="fa fa-facebook"></i> </a>
                            <a href="https://www.instagram.com/"> <i class="fa fa-instagram"></i> </a>
                            <a href="https://www.twitter.com/"> <i class="fa fa-twitter"></i> </a>
                            <a href="https://br.linkedin.com/"> <i class="fa fa-linkedin"></i> </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer