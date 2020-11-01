import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Data from '../fake'
import MyCard from '../shared/Card'
import Part from '../shared/Part'
import RadioGroup from '../shared/radioGroup'


export default function Places() {
    const [filter, setFilter] = useState('all')
    const [articles, setArticles] = useState(Data)
    const [search, setSearch] = useState(null)
    const PartOne = (
        <div className='ursula py-4'>
            Miejsca
        </div>
    )
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
        <div id='places'>
        <Part Image size='larger' height='100px' right={PartOne} />
        <Container fluid style={{minHeight:'80vh'}}>
            

            <Row className='justify-content-center'>
            <Col xs={12} lg={11} xl={10}>
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