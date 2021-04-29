import React from "react";
import { Grid, Placeholder, Segment } from "semantic-ui-react";
function CardBooking() {
  return (
    <div>
      <Grid>
        <Grid.Column>
          <Segment raised>
            <Placeholder fluid>
              <Placeholder.Header >
              <Placeholder.Line length="very long" />
                <Placeholder.Line length="very long" />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line length="very long" />
                <Placeholder.Line length="very long" />
              </Placeholder.Paragraph>
              
            </Placeholder>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default CardBooking;
