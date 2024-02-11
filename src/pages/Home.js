import "../components/css/GameContainer.css";
import "../components/css/Layout.css";
import image from '../assets/images/cat.jpeg';
import image2 from '../assets/images/cato2.jpeg';

function Home() {

    const tileDim = 300;

    const fun = () => {
        const n = 3

        for (var i=0; i < n; i++) {
            for (var j=0; j < n; j++) {
                console.log(`${-100*j}px ${-100*i}px`);
            }
            
        }
    }

    fun();

    


    return (

        <>

        <div 
            style={{ display: 'flex',
                     flexDirection: 'column', 
                     backgroundImage: `url(${image2})`,
                     width: `${tileDim}px`,
                     height: `${tileDim}px`,
                     backgroundSize: '100%',
                     backgroundRepeat: 'no-repeat' }}>
        

        <div style={{display: 'flex'}}>

            <div
                style={{
                    // border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '0px 0px',
                    backgroundRepeat: 'no-repeat',

                }}
            />
            <div
                style={{
                    // border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '-100px 0px',
                    backgroundRepeat: 'no-repeat',

                }}
            />
            <div
                style={{
                    // border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '-200px 0px',
                    backgroundRepeat: 'no-repeat',
                }}
            />

        </div>

        <div style={{display: 'flex'}}>

            <div
                style={{
                    // border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '0px -100px',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div
                style={{
                    // border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '-100px -100px',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div
                style={{
                    // border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '-200px -100px',
                    backgroundRepeat: 'no-repeat',
                }}
            />

        </div>

        <div style={{display: 'flex'}}>

            <div
                style={{
                    // border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '0px -200px',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div
                style={{
                    // border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '-100px -200px',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            <div
                style={{
                    border: '1px solid black',
                    width: '100px',
                    height: '100px',
                    backgroundSize: `${tileDim}%`,
                    backgroundImage: `url(${image2})`,
                    backgroundPosition: '-200px -200px',
                    backgroundRepeat: 'no-repeat',
                }}
            />

            </div>

        </div>  

    </>
      
    );
}

export default Home