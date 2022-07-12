import {Link} from 'react-router-dom';

const Bottom = () => {
        return (
                <div className="gnb bottom">
                    <ul>
                        <li><Link to='/'>홈</Link></li>
                        <li><Link to='/products'>상품목록</Link></li>
                        <li><Link to='/admin'>어드민</Link></li>
                        <li><Link to='/cart'>장바구니</Link></li>
                    </ul>
                </div>
            );
    }

export default Bottom;