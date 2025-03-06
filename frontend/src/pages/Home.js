import { Grid, Card, CardMedia, Box, Typography, Container } from '@mui/material';
import gridImg1 from './../resources/images/stick_dash_home.jpg';
import gridImg2 from './../resources/images/white_board_people_sketch.jpg';
import gridImg3 from './../resources/images/white_board_sketch.jpg';
import gridImg4 from './../resources/images/whiteboard_laptop.jpg';

const images = [
  {
    src: gridImg1,
    title: 'Dashboard Insights',
    description: 'Visualize and organize ideas seamlessly.'
  },
  {
    src: gridImg2,
    title: 'Creative Collaboration',
    description: 'Work together in real-time from anywhere.'
  },
  {
    src: gridImg3,
    title: 'Idea Generation',
    description: 'Sketch, draw, and bring your ideas to life.'
  },
  {
    src: gridImg4,
    title: 'Tech Integration',
    description: 'Connect with your favorite tools and devices.'
  },
];

export const Home = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(145deg, #1c1c3c, #0a0a23)',
        minHeight: '100vh',
        padding: '40px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden'
      }}
    >
      <Container>
        {/* Hero Section with Dynamic Text */}
        <Box
          sx={{
            textAlign: 'center',
            color: '#fff',
            marginBottom: '50px'
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontFamily: 'Poppins, sans-serif',
              fontWeight: 700,
              color: '#fff',
              background: 'linear-gradient(145deg, #d4418e, #0652c5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0px 0px 10px rgba(255, 255, 255, 0.3)',
              animation: 'glow 3s infinite alternate'
            }}
          >
            Unleash Your Creativity
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: 'Roboto, sans-serif',
              fontWeight: 300,
              color: 'rgba(255, 255, 255, 0.8)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Transform ideas into reality with our interactive whiteboard platform. Collaborate, sketch, and share like never before.
          </Typography>
        </Box>

        {/* Floating Doodles for Whiteboard Vibe */}
        <Box
          sx={{
            position: 'absolute',
            top: '20%',
            left: '10%',
            width: '60px',
            height: '60px',
            background: 'rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            animation: 'float 6s infinite ease-in-out'
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: '15%',
            right: '15%',
            width: '40px',
            height: '40px',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '50%',
            animation: 'float 4s infinite ease-in-out',
            animationDelay: '2s'
          }}
        />

        {/* Feature Cards */}
        <Typography
          variant="h3"
          sx={{
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 700,
            textAlign: 'center',
            color: '#fff',
            mb: 5,
          }}
        >
          Explore Our Features
        </Typography>
        <Grid container spacing={4}>
          {images.map((image, index) => (
            <Grid item xs={12} sm={6} md={6} key={index}>
              <Card
                sx={{
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.15)',
                  transition: 'transform 0.4s ease',
                  background: '#fff',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 15px 25px rgba(0,0,0,0.3)',
                  }
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height="280"
                    image={image.src}
                    alt={image.title}
                    sx={{
                      transition: 'opacity 0.3s',
                      '&:hover': {
                        opacity: 0.85
                      }
                    }}
                  />
                  <Box
                    sx={{
                      padding: '20px',
                      textAlign: 'center'
                    }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        color: '#333',
                        mb: 1
                      }}
                    >
                      {image.title}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: 'Roboto, sans-serif',
                        color: '#777'
                      }}
                    >
                      {image.description}
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
