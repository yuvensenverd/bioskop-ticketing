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
        var arr = text.split(" ")
        var synarr = []
        for(var i = 0; i<5; i++){
            synarr.push(arr[i])
        }
        return synarr.join(" ")
        
    }
    
    printMovieData = () => {

        //PRINT GENRE LIST 
        this.state.data.map((val) => {
            if(this.state.genreList.indexOf(val.genre) == -1){
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
                    <TableCell> {
                    this.state.showSynopsis == false ? 
                    <div>
                    {this.synopsisPrint(val.synopsis)}
                    <p class="font-weight-bold readmore"  onClick={() => this.setState({showSynopsis : true, currentSynopsis : val.id})}>...Read More</p>
                    </div>
                    :
                    this.state.showSynopsis == true && ((this.state.currentSynopsis == val.id) == false) ?
                    <div>
                    {this.synopsisPrint(val.synopsis)}
                    <p class="font-weight-bold readmore"  onClick={() => this.setState({showSynopsis : true, currentSynopsis : val.id})}>...Read More</p>
                    </div>
                    :
                    this.state.showSynopsis == true &&  ((this.state.currentSynopsis == val.id) == true) ?
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
        var id = this.state.currentSynopsis -1
        return(
            <p>{this.state.data[id].synopsis}</p>
        )
        
        
    }
    validateForm = () => {
        var title = this.refs.inputtitle.value
        var director = this.refs.inputdirector.value
        var genre = this.refs.inputgenre.value
        var imgurl = this.refs.inputurl.value
        if(title.replace(/\s/g, "") == "" || director.replace(/\s/g, "") == "" || genre.replace(/\s/g, "") == "" || imgurl.replace(/\s/g, "") == ""){
           // warning text
           return document.getElementById("warningbutton").innerHTML = "harap mengisi form yang kosong !  "
        }
       
        
        var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/; // Dari internet
        if(!regex .test(imgurl)) {
            return document.getElementById("warningbutton").innerHTML = "url tidak valid!  "
        } else {
            return document.getElementById("warningbutton").innerHTML = "url valid!  "
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
                    <Modal isOpen={this.state.modalOpen} >
                        <ModalHeader>
                            Add Movie
                        </ModalHeader>
                        <ModalBody>
                            <input type="text" ref="inputtitle" className="form-control" placeholder="Title"/>
                            <input type="text" ref="inputdirector" className="form-control" placeholder="Director"/>
                            <select required id = "myList" ref="inputgenre" className="form-control" placeholder="Genre">
                                    <option value="" disabled selected hidden>Choose Genre</option>
                                    {this.printGenreList()}
                            </select>
                            <input type="text" ref="inputurl"  className="form-control mb-2" placeholder="Image Url"/>
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