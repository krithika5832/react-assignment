import React, { Component } from "react";
import { connect } from "react-redux";
import { actions } from "../../actions";
import {
Spin,
Progress
} from "antd";
import {  LoadingOutlined } from "@ant-design/icons";
import _ from "lodash";
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
class Product extends React.Component {
constructor(props) {
super(props);
this.state = {
activePage: 1,
count:Number,
calculatedRows: [],
totalPages: 1,
rowsPerPage: 5,
filters: ""
};
}
componentDidMount() {
this.props.GetProductList();
}
componentDidUpdate (prevProps){
if (prevProps !== this.props) {
const handleActions = () => {
this.handleData();
};
let productlistStatus = this.props.productlist.getstatus;
productlistStatus == 'success'
? this.setState({
productlistData: this.props.productlist.items,
},
handleActions
)
: this.setState({
productlistData: [],
})
}
}
handleData = () => {
const {productlistData} = this.state
const CopyproductlistData = JSON.parse(JSON.stringify(productlistData));
const updatedproductlistData = CopyproductlistData.map((data)=>{
data["salary"] = `$ ${data["salary"]}`;
if(data["sales"] < 400000){
data["sales"] = <Progress percent={data["sales"]} status="exception" />
}
else if(data["sales"] < 600000){
data["sales"] = <Progress percent={data["sales"]} status="normal" />
}
else{
data["sales"] = <Progress percent={data["sales"]} status="success" />
}
return data;
});
this.setState({updatedproductlistData: updatedproductlistData},this.handlePagination);
}
handlePagination = () => {
const {updatedproductlistData, activePage, rowsPerPage} = this.state;
this.setState({
count: updatedproductlistData.length,
calculatedRows: updatedproductlistData.slice((activePage - 1) * rowsPerPage, activePage * rowsPerPage),
totalPages : Math.ceil(updatedproductlistData.length / rowsPerPage)
});		
}
handlePagePrevious = () => {
const {activePage} = this.state;
this.setState({activePage: activePage - 1},this.handlePagination);
}
handlePageNext = () => {
const {activePage} = this.state;
this.setState({activePage: activePage + 1},this.handlePagination);
}
handlePageFirst = () => {
this.setState({activePage: 1},this.handlePagination);
}
handlePageLast = () => {
const {totalPages} = this.state;
this.setState({activePage: totalPages},this.handlePagination);
}
handleActivePage = () => {
this.setState({activePage: 1},this.handlePagination);
}
render() {
const {calculatedRows} = this.state;
const {  productlist } = this.props;
const columns1 = [
{ title: 'name', label: 'Name' },
{ title: 'salary', label: 'Salary' },
{ title: 'sales', label: 'Sales' },
];
const CustomTable = ({ columns, rows }) => {
const {activePage, count, totalPages, rowsPerPage} = this.state;
return (
<>
<table>
	<thead>
		<tr>
			{columns.map(column => {
			return <th key={column.title}>{column.label}</th>
			})}
		</tr>
	</thead>
	<tbody>
		{rows == undefined   ? "" : 
		rows.map(row => {
		return (
		<tr key={row.id}>
			{columns.map(column => {
			if (column.format) {
			return <td key={column.title}>{column.format(row[column.title])}</td>
			}
			return <td key={column.title}>{row[column.title]}</td>
			})}
		</tr>
		)
		})
		}
	</tbody>
</table>
<Pagination
	activePage={activePage}
	count={count}
	rowsPerPage={rowsPerPage}
	totalPages={totalPages}
	setActivePage={this.handleActivePage}
	/>
</>
)
}
const Pagination = () => {
const {activePage, count, totalPages, rowsPerPage} = this.state;
const beginning = activePage === 1 ? 1 : rowsPerPage * (activePage - 1) + 1
const end = activePage === totalPages ? count : beginning + rowsPerPage - 1
return (
<>
<div className="pagination">
	<button disabled={activePage === 1} onClick={() => this.handlePageFirst()}>
	⏮️ First
	</button>
	<button disabled={activePage === 1} onClick={() => this.handlePagePrevious()}>
	⬅️ Previous
	</button>
	<button disabled={activePage === totalPages} onClick={() => this.handlePageNext()}>
	Next ➡️
	</button>
	<button disabled={activePage === totalPages} onClick={() => this.handlePageLast()}>
	Last ⏭️
	</button>
</div>
<p>
	Page {activePage} of {totalPages}
</p>
<p>
	Rows: {beginning === end ? end : `${beginning} - ${end}`} of {count}
</p>
</>
)
}
return (
<React.Fragment>
	<div className="x-psalary-container">
		<div className="x-panel">
			<div className="x-panel-body">
				<div className="col-md-12">
					<div className="x-psalary-title">
						<h1>List of Products</h1>
					</div>
				</div>
				<div className='row col-lg-12 col-xl-12 px-0'>
					<div className='table-responsive'>
						{productlist.getloading 
						? (
						<div>
							<Spin indicator={antIcon} />
						</div>
						) : (
						<CustomTable rows={calculatedRows} columns={columns1} />
						)}
					</div>
				</div>
			</div>
		</div>
	</div>
</React.Fragment>
);
}
}
function mapState(state) {
const {  productlist } = state;
return {  productlist };
}
const actionCreators = {
GetProductList: actions.GetProductList,
};
const connectedProduct = connect(mapState, actionCreators)(Product);
export { connectedProduct as Product };