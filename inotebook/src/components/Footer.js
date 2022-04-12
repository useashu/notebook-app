import React from "react";
function Footer() {
    const year = new Date().getFullYear();
    return (
        <footer>
            <div  style={{backgroundColor:"black"}}>
                <footer className="py-3 my-4 ">
                    <p className="text-center" style={{color:"white"}}>copyright @ {year}</p>
                </footer>
            </div>
        </footer>
    );
}

export default Footer;