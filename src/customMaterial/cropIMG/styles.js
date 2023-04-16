

export const styles = theme => ({

    cropContainer: {
      position: 'relative',
      marginRight:'15rem',
      height: 200,
      background: '#121212',
      [theme.breakpoints.up('sm')]: {
        height: 400,
        width: 300,
      },
    },

    cropButton: {
      flexShrink: 0,
      background: '#121212',
      "&:hover": {
        background: "#4a4a4a"
      },
    },

    controls: {
      width:'20rem',
      alignItems: 'stretch',
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
      },
    },
    sliderContainer: {

      display: 'flex',
      flex: '1',
      alignItems: 'center',
    },
    sliderLabel: {
      [theme.breakpoints.down('xs')]: {
        minWidth: 65,
      },
    },
    slider: {
      color: '#121212',

      padding: '22px 0px',
      marginLeft: 16,
      [theme.breakpoints.up('sm')]: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: '0 16px',
      },
    },

  })
  