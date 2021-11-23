import React from 'react';
import Funnel, {
  Title,
  Margin,
  Export,
  Tooltip,
  Item,
  Border,
  Label,
} from "devextreme-react/funnel";
import Container from 'react-bootstrap/esm/Container';


class Graph extends React.Component {
  constructor(props) {
    super(props);

  }
   
  render() {
    console.log(this.props.graficos);
    return (
      <Container>
      <Funnel
        id="funnel"
        dataSource={this.props.graficos}
        argumentField="nomeFunil"
        valueField="acessos"
        sortData={false}
      
        
      >
        <Title text={this.props.titulo}>
          <Margin bottom={30} />
        </Title>
        <Export enabled={true} />
        <Tooltip enabled={true} format="fixedPoint" />
        <Item>
          <Border visible={true} />
        </Item>
        <Label
          visible={true}
          position="inside"
          backgroundColor="none"
          customizeText={formatLabel}
         
        />
      </Funnel>
      </Container>
    );
  }


}


function formatLabel(arg) {
    return `<span class="label">${arg.percentText}</span><br/>${arg.item.argument}`;
  }

  


export default Graph;
