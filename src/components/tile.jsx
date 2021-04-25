import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import TheatersIcon from '@material-ui/icons/Theaters';
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';
import Gauge from './gauge';
import { makeStyles } from '@material-ui/core/styles';

const LIKE_PANEL_WIDTH = 100;

const useStyles = makeStyles((theme) => ({
    root: {
      width: 345,
      margin: 10,
      display: 'inline-block',
    },
    title: {
        fontSize: '1.2rem',
        fontWeight: 'bold',
    },
    delete: {
        marginLeft: 'auto',
    }
}));


export default function Tile(props) {
    const classes = useStyles();

    let handleLike = () => {
        if (props.like){
            props.like();
        }
    }

    let handleDislike = () => {
        if (props.dislike){
            props.dislike();
        }
    }

    return(
        <Card className={classes.root}>
            <CardHeader
                classes={{title: classes.title}}
                avatar={
                    <Avatar aria-label="movie">
                        <TheatersIcon />
                    </Avatar>
                }
                title={props.title}
                subheader={props.category}
            >
            </CardHeader>
            <CardActions disableSpacing>
                <div style={{display: 'inline-block'}} >
                    <div style={{width: LIKE_PANEL_WIDTH}}>
                        <IconButton 
                            aria-label="like"
                            onClick={handleLike}
                        >
                            <ThumbUpIcon color={props.userLike ? 'primary' : 'inherit'}/>
                        </IconButton>
                        <IconButton 
                            aria-label="dislike"
                            onClick={handleDislike}
                        >
                            <ThumbDownIcon color={props.userDislike ? 'secondary' : 'inherit'}/>
                        </IconButton>
                    </div>
                    <Gauge 
                        height={5}
                        width={LIKE_PANEL_WIDTH}
                        ratio={(props.likes + props.dislikes > 0) ? (props.likes/(props.likes+props.dislikes)) : 0}
                    />
                    <div style={
                        {
                            fontSize: '0.875rem',
                            fontStyle: 'italic',
                            color: 'rgba(0, 0, 0, 0.54)',
                        }
                    }>
                        {`${props.likes + props.dislikes} votes`}
                    </div>                                        
                </div>                
                <IconButton 
                    className={classes.delete}
                    aria-label="delete"
                    onClick={props.delete}
                >
                        <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
}