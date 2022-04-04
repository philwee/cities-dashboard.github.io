
import Card from '../../Components/Card/Card'
import "./Home.css"

export default function Home() {
  return (
    <div className='home'>
      <div className="projects">
          <Card 
              title='Project 1'
              imageUrl= "../../Components/Card/graph.png"
              body='Researcher Name'
            />
          <Card 
            title='Project 2'
            imageUrl= "../../Components/Card/graph.png"
            body='Researcher Name'
          />
          <Card 
            title='Project 3'
            imageUrl= "../../Components/Card/graph.png"
            body='Researcher Name'
          />
      </div>
        
    </div>
  )
}
