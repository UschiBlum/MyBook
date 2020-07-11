import React, {Component} from 'react'
import './navbar.css'

class Footer extends Component {
    render() {
        return (
            <footer>
                    <hr />
                    <div className="row justify-content-center" style={{height: '5em'}}>
                        <div className="col-md-4 footer-brand animated fadeInLeft" >
                           <p className="copyright text-muted text-center text-footer">Copyright &copy; Donotreact 2020</p>
                        </div>
                        <div className="col-md-3 footer-nav animated fadeInUp">
                            <a href="https://github.com/" className="text-footer">GitHub</a>
                        </div>
                        <div className="col-md-3 footer-nav animated fadeInUp">
                            <a href="https://youtube.com/" className="text-footer">YouTube</a>
                        </div>
                        <div className="col-md-2 footer-nav animated fadeInUp">
                            <a href="https://heroku.com/" className="text-footer">HEROKU</a>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto" style={{height: '5em'}}>
                            <h3 className="heading">With MyBook to your book!</h3>
                        </div>
                    </div>
            </footer>
        )
    }
}

export default Footer