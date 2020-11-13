import React, {useState, useEffect} from 'react'
import TextField from '@material-ui/core/TextField';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Data from '../fake'
import MyCard from '../shared/Card'
import Part from '../shared/Part'
import RadioGroup from '../shared/radioGroup'
import CheckboxGroup from '../shared/checkboxGroup'
import Image from '../img/cool2.png'

const defaultCategories = [
    {label: 'Postacie', name: 'Postacie', isChecked: true},
    {label: 'Miejsca', name: 'Miejsca', isChecked: true},
    {label: 'Przedmioty', name: 'Przedmioty', isChecked: true},
    {label: 'Stworzenia', name: 'Stworzenia', isChecked: true},
    {label: 'Książki/Filmy', name: 'Książki/Filmy', isChecked: true},
    {label: 'Inne', name: 'Inne', isChecked: true},
]
const defaultAllCategories = [
    {label: 'Wszystkie', name: 'Wszystkie', isChecked: true}
]
export default function Characters() {

    const [categories, setCategories] = useState([...defaultCategories])
    const [allCategories, setAllCategories] = useState(...defaultAllCategories)

    const [filter, setFilter] = useState('all')
    const [articles, setArticles] = useState(Data)
    const [search, setSearch] = useState(null)

    const PartOne = (
        <div className='ursula'>
            Świat przedstawiony
        </div>
    )
    const handleAllCategoryChange = (event) => {
        let newAllCategories = allCategories
        newAllCategories.isChecked = event.target.checked
        setAllCategories(newAllCategories)

        let newCategories = [...categories]
        newCategories.forEach(category => {
            if (event.target.checked === true) {
                category.isChecked = event.target.checked
            }
        })
        setCategories(newCategories) 
    }

    const handleCategoryChange = (event) => {
        if (!event.target.checked) {
        let newAllCategories = allCategories
        newAllCategories.isChecked = event.target.checked
        setAllCategories(newAllCategories)
        }

        let newCategories = [...categories]
        newCategories.forEach(category => {
            if (category.name === event.target.name) {
                category.isChecked = event.target.checked

            }
        })
        setCategories(newCategories)      
    }

    const handleChange = (event) => {
        setFilter(event.target.value)
    }

    const filterRow = (row) => {
        if (filter === 'description') {
            return (row.description.toLowerCase().includes(search.toLowerCase()))
        } else if (filter === 'title') {
            return (row.title.toLowerCase().includes(search.toLowerCase()))
        } else {
            return (row.title.toLowerCase().includes(search.toLowerCase()) || row.description.toLowerCase().includes(search.toLowerCase()))
        }
    }

    const searchSpace=(event)=>{
        let keyword = event.target.value;
        setSearch(keyword)
      }

    useEffect(() =>{
        if (allCategories.label.length === 9) {
            
            let length = articles.length
            let newAllCategories = allCategories
            newAllCategories.label += `(${length})`
            setAllCategories(newAllCategories)
        }
    }, [allCategories])

    useEffect(() =>{

        if (categories[0].label.length === 8) {
            let newCategories = [...categories]
            newCategories.forEach((category) => {
                let length
                length = articles.filter((article) => {
                    if (article.category === category.name) {
                        return article
                    }
                }).length
                
                category.label += `(${length})`
            })
            setCategories(newCategories)
        }
    }, [])


    return (
        <div id='characters'>
        <Part Image size='larger' height='100px' right={PartOne} />
        <Container fluid style={{
            minHeight:'80vh',
            backgroundImage: `url(${Image})`
            }}>
            

            <Row className='justify-content-center'>
            <Col xs='auto'>
                <CheckboxGroup allCheck={allCategories} handleAllCategoryChange={handleAllCategoryChange} handleCategoryChange={handleCategoryChange} categories={categories}/>
            </Col>
            <Col xs='auto' lg={10} className='border-world'>

            <TextField onChange={(e)=>searchSpace(e)} className='mx-1 mt-4 mb-2' style={{width: '99%'}} id="standard-basic" label="Tutaj wpisz szukaną frazę..." />

            <RadioGroup className='mx-1' filter={filter} handleChange={handleChange} />
            <Row className='justify-content-start mx-1'>
                
                {articles
                    
                    .filter(row => {
                    if (allCategories.isChecked){
                        return row
                    } else {
                        let length
                        length = categories.filter((cat) => {
                            console.log(cat.name)
                            console.log(row.category)
                            return (cat.name === row.category && cat.isChecked)
                        }).length
                        
                        if (length === 1){
                            return true
                        }
                    }})
                
                    .filter(row=>{
                        if (search == null)
                            return row
                        else if (filterRow(row)){
                            return row
                        }

                    }).map(row => (
                            <MyCard
                            small
                            key={row.description}
                            title={row.title}
                            description={row.description}
                            slug={row.slug}>

                            </MyCard>
                        ))}
                

            </Row>
            </Col>
            </Row>
        </Container>
        </div>
    )
}