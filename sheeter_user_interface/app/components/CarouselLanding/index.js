/**
 *
 * CarouselLanding
 *
 */
import { makeStyles } from '@material-ui/core/styles';

import React, { memo } from 'react';
import Carousel from 'react-material-ui-carousel'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// import PropTypes from 'prop-types';
// import styled from 'styled-components';

const useStyles = makeStyles(theme => ({

  media: { // Height of media image
    height:600
  },

  carousel: {
    width : '100vw'
  }
}));


/**
 * Item used for the carousel
 * @param {*} props 
 */
function Item(props){
  const classes = useStyles();

  return (
    <div className={classes.carousel}>
      <Card>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="https://www.sciencesetavenir.fr/assets/img/2019/04/10/cover-r4x3w1000-5cadebdd93968-trou-noir-galaxie.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {props.item.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {props.item.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
    
  )
}

/**
 * Carousel used for the Landing Page
 * @param {*} props 
 */

function CarouselLanding(props) {
  const classes = useStyles();
  

  const dummyItems = [
    {
        name: "Lear Music Reader",
        description: "A PDF Reader specially designed for musicians.",
        color: "#64ACC8"
    },
    {
        name: "Hash Code 2019",
        description: "My Solution on the 2019 Hash Code by Google Slideshow problem.",
        color: "#7D85B1"
    },
    {
        name: "Terrio",
        description: "A exciting mobile game game made in the Unity Engine.",
        color: "#CE7E78"
    },
    {
        name: "React Carousel",
        description: "A Generic carousel UI component for React using material ui.",
        color: "#C9A27E"
    }
  ]

  return (
    <Carousel
      className={classes.carousel}
      autoPlay={true}
      indicators={true}
      animation="slide"
      navButtonsAlwaysInvisible={true}
    >
      {
          dummyItems.map( (item, index) => {
              return <Item item={item} key={index}/>
          })
      }
      
    </Carousel>
  );
}

CarouselLanding.propTypes = {};

export default memo(CarouselLanding);
