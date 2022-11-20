import icon from '../../assets/img/logo.png'

import './styles.css'

function Header() {
    return (
        <>
            <header>
                <div className="dsmeta-logo-container">
                    <img src={icon} alt="DSMeta" />
                    <h1>DSMeta</h1>
                    <p>Desenvolvido por
                        <a href="https://marcalsantarem.github.io"> @marcalsantarem</a>
                    </p>
                </div>
            </header>
        </>
    )
}

export default Header





