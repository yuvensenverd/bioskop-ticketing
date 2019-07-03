import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import Container from '@material-ui/core/Container';
import Axios from 'axios'
import {EditAttributesRounded, DeleteForeverRounded} from '@material-ui/core' 
import { Form, FormGroup, Label, Input } from 'reactstrap';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


// MATERIAL UI (Google) >> REACT HOOKS

class manageMovie extends React.Component{
    // state
    // lifecycle
    // function
    // render
    state = {
        data : [],
        modalOpen : false,
        genreList : [],
        showSynopsis : false,
        currentSynopsis : null,
    }
    componentDidMount(){
        this.getDataMovies()
        
    }
    getDataMovies = () => {
        Axios.get("http://localhost:2000/movies")
        .then((result)=>{
            
            this.setState({
                data : result.data 
            })
           
        })
        .catch((error) => {
            console.log(error)
        })
    }
    synopsisPrint = (text) => {
        //PANGGIL synopsisprint(synopsis, id)
        // IF state currentsyn === id >> print semua
        
        // else print V
        var arr = text.split(" ")
        var synarr = []
        for(var i = 0; i<5; i++){
            synarr.push(arr[i])
        }
        return synarr.join(" ")
        
    }
    
    printMovieData = () => {

        
        this.state.data.map((val) => {
            if(this.state.genreList.indexOf(val.genre) === -1){
                this.state.genreList.push(val.genre)
            }
        })
        console.log(this.state)
        

        var output = this.state.data.map((val,index) => {
            return(
                <TableRow>
                    <TableCell>{index+1}</TableCell>
                    <TableCell>{val.title}</TableCell>
                    <TableCell>{val.genre}</TableCell>
                    <TableCell><img src={val.image} height="50px" alt=""></img></TableCell>
                    <TableCell>{val.director}</TableCell>
                    <TableCell>{val.playingTime.join(",")}</TableCell>
                    <TableCell>{val.duration} Minutes</TableCell>
                    <TableCell> 
                    {
                    this.state.showSynopsis === false ? 
                    <div>
                    {this.synopsisPrint(val.synopsis)}
                    <p class="font-weight-bold readmore"  onClick={() => this.setState({showSynopsis : true, currentSynopsis : val.id})}>...Read More</p>
                    </div>
                    :
                    this.state.showSynopsis === true && ((this.state.currentSynopsis === val.id) === false) ?
                    <div>
                    {this.synopsisPrint(val.synopsis)}
                    <p class="font-weight-bold readmore"  onClick={() => this.setState({showSynopsis : true, currentSynopsis : val.id})}>...Read More</p>
                    </div>
                    :
                    this.state.showSynopsis === true &&  ((this.state.currentSynopsis === val.id) === true) ?
                    <div>
                    {this.fullSynopsisPrint()}
                    </div>
                    :
                    null
                    }
                    </TableCell>
                    <TableCell>
                        <div><input type="button" value="edit" className="btn btn-block btn-primary btn-sm"></input>
                        <input type="button" value="delete" className="btn btn-block btn-danger btn-sm"></input></div>
                    </TableCell>
                </TableRow>
            )
        })
        return output
    }
    closeModal = () => {
        this.setState({
            modalOpen : false
        })
        console.log(this.state)
       
    }
    fullSynopsisPrint = () => {
        var id = this.state.currentSynopsis -1 // -1 karena index state.data dari 0 
        return(
            <p>{this.state.data[id].synopsis}</p>
        )
        
        
    }
    validateForm = () => {
        var title = this.refs.inputtitle.value
        var director = this.refs.inputdirector.value
        var genre = this.refs.inputgenre.value
        var image = this.refs.inputurl.value
        var playingTime = this.refs.inputpt.value
        var duration = this.refs.inputduration.value
        
        var synopsis = this.refs.inputsynopsis.value
        if(title.replace(/\s/g, "") === "" || director.replace(/\s/g, "") === ""
         || genre.replace(/\s/g, "") === "" || image.replace(/\s/g, "") === ""
         || playingTime.replace(/\s/g, "") === "" || duration.replace(/\s/g, "") === "" || synopsis.replace(/\s/g, "") === "")
         
         {
           // warning text
           return document.getElementById("warningbutton").innerHTML = "harap mengisi form yang kosong !  "
        }
       
        // URL VALIDATION
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/; // Dari internet
        if(!regex .test(image)) {
            return document.getElementById("warningbutton").innerHTML = "url tidak valid!  "
        } else {
            
        }

        var data = {
            genre : genre,
            title : title,
            duration : duration,
            synopsis : synopsis,
            playingTime : playingTime,
            director : director,
            image : image,

            
            
        }

        
        // const axios = require('axios');
        // axios.post('http://localhost:2000/movies', {
        //     id: this.state.data.length,
        //     genre: genre,
        //     title: title,
        //     duration: ,
        //     synopsis: "Pasangan suami istri Ed Warren (Patrick Wilson) dan Lorraine Warren (Vera Farmiga) sepakat untuk meletakkan boneka Annabelle di ruang khusus mereka. Dibalik lemari kaca suci dan mendapat berkat dari seorang pendeta. Namun malapetaka datang saat Annabelle membangunkan roh-roh jahat yang ada di ruangan itu. Putri pasangan ini, Judy Warren (Mckenna Grace) dan temannya menjadi target teror baru Annabelle dan iblis jahat lainnya.",
        //     playingTime: [
        //     9,
        //     14,
        //     20
        //     ],
        //     director: "Gary Dauberman",
        //     image: "https://media.21cineplex.com/webcontent/gallery/pictures/156074568118284_452x647.jpg"
        //     },).then(resp => {
        //     console.log(resp.data);
        // }).catch(error => {
        //     console.log(error);
        // });   

    }
    printGenreList = () => {
        var jsx = this.state.genreList.map((val) => {
            return(
                <option value={val}>{val}</option>
            )
            
        })
        return jsx
    }           
        

    render(){
        return(
            <div class="adminbackcolor">
                
                <Container fixed>
                    <h1 className="mt-3"><center>Manage Movie Page</center></h1>
                    <input type="button" value="Add Data" className="btn btn-success mb-2 mt-2" onClick={() => this.setState({modalOpen : true})}></input>
                    {/*MODAL START */}
                    <Modal isOpen={this.state.modalOpen} toggle={this.closeModal}>
                        <ModalHeader>
                            Add Movie
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" ref="inputtitle" className="form-control mb-2" placeholder="Title"/>
                            <input type="text" ref="inputdirector" className="form-control mb-2" placeholder="Director"/>
                            <select required id = "myList" ref="inputgenre" className="form-control mb-2" placeholder="Genre">
                                    <option value="" disabled selected hidden>Choose Genre</option>
                                    {this.printGenreList()}
                            </select>
                            <input type="text" ref="inputurl"  className="form-control mb-2" placeholder="Image Url"/>
                            {/* <input type="number" ref="inputpt" min="1" max="24" className="form-control mb-2" placeholder="Playtime" /> */}
                            {/* <FormGroup check inline>
                                <Label>
                                    Playing at : 
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" />09:00
                                </Label>
                            </FormGroup>
                            <FormGroup check inline>
                                <Label check>
                                    <Input type="radio" />14:00
                                </Label>
                            </FormGroup> */}
                            <select required id = "playtimelist" ref="inputpt" className="form-control mb-2" placeholder="playtime">
                                    <option value="" disabled selected hidden>Choose Playtime</option>
                                    <option value="8">8:00</option>
                                    <option value="9">9:00</option>
                                    <option value="10">10:00</option>
                                    <option value="11">11:00</option>
                                    <option value="12">12:00</option>
                                    <option value="13">13:00</option>
                                    <option value="14">14:00</option>
                                    <option value="15">15:00</option>
                                    <option value="16">16:00</option>
                                    <option value="17">17:00</option>
                                    <option value="18">18:00</option>
                                    <option value="19">19:00</option>
                                    <option value="20">20:00</option>
                                    <option value="21">21:00</option>
                                    <option value="22">22:00</option>
                                    <option value="23">23:00</option>
                                    <option value="24">24:00</option>
                            </select>
                            <input type="number" ref="inputduration"  className="form-control mb-2" placeholder="Duration"/>
                            <textarea  ref="inputsynopsis"  className="form-control mb-2" placeholder="Synopsis"/>
                            
                            <p id="warningbutton" style={{color : "red"}}> </p>
                        </ModalBody>
                        <ModalFooter>
                        <input type="button" value="SAVE" className="btn btn-success " onClick={this.validateForm}/>
                        <input type="button" value="CANCEL" className="btn btn-danger" onClick={this.closeModal}/>
                        </ModalFooter>
                    </Modal>
                    {/*MODAL END */}
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableCell>No</TableCell>
                                <TableCell>Title</TableCell>
                                <TableCell>Genre</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Director</TableCell>
                                <TableCell>Playtime</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Synopsis</TableCell>
                                <TableCell>Action</TableCell>
                            </TableHead>
                            <TableBody>
                                {/* <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell>
                                </TableRow> */}
                                {this.printMovieData()}
                               
                            </TableBody>
                        </Table>
                    </Paper>
                </Container>
            </div>
        )
    }
}

export default manageMovie;