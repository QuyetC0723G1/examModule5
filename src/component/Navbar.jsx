import {Link} from "react-router-dom";

const Navbar = () => {
    return (
        <>
            <h2>
                <Link to={'/products/list'}>Home</Link> |
                <Link to={'/products/add'}>Create</Link> |

            </h2>
            <hr/>
        </>
    )
}
export default Navbar;