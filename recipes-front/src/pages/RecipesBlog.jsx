import React from "react";
import { Container, Typography, Grid, Button, Box } from "@mui/material";
import RecipeCard from "../components/RecipeCard";

const RecipesBlog = ({ recipes }) => {
  return (
    <Container sx={{ mt: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            mb: 2,
            textTransform: 'uppercase',
          }}
        >
          Welcome to the Recipes Blog
        </Typography>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontStyle: 'italic',
            mb: 3,
            maxWidth: '700px',
            margin: '0 auto',
          }}
        >
          Discover delicious recipes, cooking tips, and explore a wide variety of dishes from around the world. Whether you're an experienced chef or just starting out, our blog offers something for everyone!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3, fontSize: '16px', padding: '10px 20px' }}
          href="http://recipes-service.default.svc.cluster.local"
        >
          Connect to the Website
        </Button>
      </Box>

      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid item xs={12} sm={6} md={4} key={recipe.id}>
            <RecipeCard recipe={recipe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default RecipesBlog;
