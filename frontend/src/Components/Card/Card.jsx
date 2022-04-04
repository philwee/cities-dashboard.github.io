import './Card.css';
import graphImg from './graph.png'


function Card({title,imageUrl,body}){
    return (
        <div className="cardContainer">
            <div className="cardContents">
            <div className='cardHeader'>
                <div className='cardTitle'>
                    <h3>{title}</h3>
                </div>
                <div className='cardBody'>
                    <p>{body}</p>
                </div>
            </div>

            <div className='imageContainer'>
                <img src={graphImg} alt="" />
            </div>
            <button className="buttonStyles">Details</button>

            </div>
            
        </div>

       
    );
}

export default Card;
