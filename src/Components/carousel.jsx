import '../assets/css/style.css' ;
import '../assets/css/responsive.css';
import '../assets/css/font-awesome.min.css';
import '../assets/css/bootstrap.min.css';
import slide1 from '../assets/img/h4-slide.png'
import slide2 from '../assets/img/h4-slide2.png'
import slide3 from '../assets/img/h4-slide3.png'
 
function Carousel(){
    return(
        <div className="slider-area">
        <div className="block-slider block-slider4">
   
   
  <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img className="d-block w-100" src={slide1} alt="First slide"/>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={slide2} alt="Second Slide"/>
      </div>
      <div className="carousel-item">
        <img className="d-block w-100" src={slide3}alt="Third Slide"/>
      </div>
    </div>
      <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true"></span>
      <span className="sr-only">Next</span>
    </a>
  </div>
        </div>
      </div>
    );
   
}
 
export default Carousel;