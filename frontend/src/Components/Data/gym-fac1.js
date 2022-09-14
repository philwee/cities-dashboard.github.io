import React from 'react'
import { Category, ChartComponent ,DataLabel,Inject,Legend,LineSeries, SeriesCollectionDirective, SeriesDirective, Tooltip, StackingBarSeries} from '@syncfusion/ej2-react-charts';
import './sync.css'
import {dataSource} from './data.js';

function Gym1(){
  // add(){
  //   this.chartInstance.addSeries([
  //     { type: 'Line',
  //       dataSource: {gymData},
  //       xName: 'day',
  //       yName: 'total'},
  //     ]);
  // };

  return (
      <div className="Gym1">
        <ChartComponent title='All Facility Check In By Day' primaryXAxis={{valueType:"Category" ,title:"Day"}} primaryYAxis={{title:"Check In"}} Legend={{visible:true}}  tooltip={{enable:true}}>
          <Inject services={[LineSeries,Category,Legend,DataLabel,Tooltip]}></Inject>
          <SeriesCollectionDirective>
            <SeriesDirective type='Line' dataSource={dataSource} xName="year" yName='staff_affiliation' name='Staff Affiliation' marker={{dataLabel:{visible:true},visible:true}} >
            </SeriesDirective>
            <SeriesDirective type='Line' dataSource={dataSource} xName="year" yName='undergrad' name='Undergrad' marker={{dataLabel:{visible:true},visible:true}}>
            </SeriesDirective>
            <SeriesDirective type='Line' dataSource={dataSource} xName="year" yName='grad_alumni' name='Grad and Alumni' marker={{dataLabel:{visible:true},visible:true}}>
            </SeriesDirective>
            <SeriesDirective type='Line' dataSource={dataSource} xName="year" yName='visitors' name='Visitors' marker={{dataLabel:{visible:true},visible:true}}>
            </SeriesDirective>

          </SeriesCollectionDirective>
        </ChartComponent>
      </div>


    );
  }

export default Gym1;
  
