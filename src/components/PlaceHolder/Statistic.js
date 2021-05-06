import React from "react";
import { Grid, Placeholder, Segment } from "semantic-ui-react";

function Statistic() {
  return (
    <Grid columns={4} stackable>
      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Header image>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
            </Placeholder.Header>
          </Placeholder>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Header image>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
            </Placeholder.Header>
          </Placeholder>
        </Segment>
      </Grid.Column>
      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Header image>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
            </Placeholder.Header>
          </Placeholder>
        </Segment>
      </Grid.Column>

      <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Header image>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
            </Placeholder.Header>
          </Placeholder>
        </Segment>
      </Grid.Column>

      {/* <Grid.Column>
        <Segment raised>
          <Placeholder>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
            <Placeholder.Header image>
              <Placeholder.Line length="long" />
              <Placeholder.Line length="long" />
            </Placeholder.Header>
          </Placeholder>
        </Segment>
      </Grid.Column> */}
    </Grid>
  );
}

export default Statistic;
