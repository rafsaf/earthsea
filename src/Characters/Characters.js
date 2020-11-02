import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Data from '../fake'
import MyCard from '../shared/Card'
import Part from '../shared/Part'
import RadioGroup from '../shared/radioGroup'
import CheckboxGroup from '../shared/checkboxGroup'


export default function Characters() {
    const categories = [
        {id:1, name: 'Wszystkie', isChecked: true},
        {id:2, name: 'Postacie', isChecked: true},
        {id:3, name: 'Miejsca', isChecked: true},
        {id:4, name: 'Przedmioty', isChecked: true},
        {id:5, name: 'Stworzenia', isChecked: true},
        {id:6, name: 'Książki/Filmy', isChecked: false},
        {id:7, name: 'Inne', isChecked: true},

    ]
    const [filterCategory, setFilterCategory] = useState(categories)
    const [filter, setFilter] = useState('all')
    const [articles, setArticles] = useState(Data)
    const [search, setSearch] = useState(null)
    const PartOne = (
        <div className='ursula py-4'>
            Świat przedstawiony
        </div>
    )
    const handleCategoryChange = (event) => {
        let newCategories = filterCategory
        newCategories.forEach(category => {
            if (category.name === event.target.name) {
                category.isChecked = !category.isChecked

            }
        })
        setFilterCategory(newCategories)      
    }

    const handleChange = (value) => {
        setFilter(value)
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

    return (
        <div id='characters'>
        <Part Image size='larger' height='100px' right={PartOne} />
        <Container fluid style={{minHeight:'80vh'}}>
            

            <Row className='justify-content-start'>
            <Col xs='auto'>
                <CheckboxGroup handleCategoryChange={handleCategoryChange} categories={filterCategory}/>
            </Col>
            <Col xs='auto' lg={10}>
            <TextField onChange={(e)=>searchSpace(e)} className='mx-1 mt-4 mb-2' style={{width: '99%'}} id="standard-basic" label="Tutaj wpisz szukaną frazę..." />
            <RadioGroup handleChange={handleChange} />
            <Row className='justify-content-center mx-1'>
                
                {articles.filter(row=>{
                        if(search == null)
                            return row
                        else if(filterRow(row)){
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