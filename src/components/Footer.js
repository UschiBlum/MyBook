import React, {Component} from 'react'

class Footer extends Component {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <a href="#"></a>
                            <a className="mx-3" href="#"></a>
                            <a href="#"></a>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-auto">
                            <p className="copyright text-muted">Copyright &copy; Donotreact 2020</p>
                        </div>
                    </div>
                </div>
            </footer>
        )
    }
}

export default Footer