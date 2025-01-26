import React from "react";
import { Card, CardActionArea, CardMedia, CardContent, Typography } from "@mui/material";

const RecipeCard = ({ recipe, onClick }) => (
  <Card sx={{ maxWidth: 345, boxShadow: 3, mb: 2 }}>
    <CardActionArea onClick={onClick}>
      <CardMedia
        component="img"
        height="140"
        image={recipe.image}
        alt={recipe.title}
      />
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {recipe.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Cuisine: {recipe.cuisine}
        </Typography>
      </CardContent>
    </CardActionArea>
  </Card>
);

export default RecipeCard;
