const Analytics = require('analytics-node');

export const writeUserDataToSegment = async () => {
    const userInfo = await window.miro.board.getUserInfo()
    const boardInfo = await window.miro.board.getInfo()
    const analytics = new Analytics(process.env.REACT_APP_SEGMENT_WRITE_KEY, { flushAt: 20 });
    analytics.flushed = true;
  
    analytics.page({
      userId: userInfo.id,
      properties: {
        board: boardInfo.id
      },
      category: "Sidebar",
      name: window.location.pathname
    })
    
    await analytics.flush(function(err, batch) {
      console.log('Flushing Segment queue'); 
      return {success: true}     
    });    
  }