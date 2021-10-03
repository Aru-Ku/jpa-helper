<script>
	import "carbon-components-svelte/css/g90.css";
	import Header from './Header.svelte';
	import { Content, Grid, Row, Column } from "carbon-components-svelte";
	import { TextInput, TextArea, CodeSnippet } from "carbon-components-svelte";
	import { Button, ContentSwitcher, Switch} from "carbon-components-svelte";
	import { generateEntity, generateBean } from './codes';

	let selectedIndex = 0;
	let errors = [];
	let isCodeGenerated = false;

	let schemaName = '';
	let tableName = '';
	let columns = '';
	let primaryKey = '';
	let generatedKey = '';

	let entityCode = '';
	let beanCode = '';

	function generateCode() {
		errors = [];
		isCodeGenerated = false;
		if(!schemaName) errors.push('schemaName');
		if(!tableName) errors.push('tableName');
		if(!columns) errors.push('columns');
		if(errors.length > 0 ) return;
		
		entityCode = generateEntity(schemaName.toUpperCase(), tableName.toUpperCase(), primaryKey.toUpperCase(), columns.toUpperCase(), generatedKey.toUpperCase());
		beanCode = generateBean(tableName.toUpperCase(), columns.toUpperCase());
		isCodeGenerated = true;
	}
</script>

<Header />

<div class="jpa-content">
	<Grid>
		<Row>
			<Column style="outline: 1px solid var(--cds-interactive-04)">
				<TextInput invalid={errors.includes('schemaName')} inline invalidText="Schema Name is required" labelText="Schema Name" placeholder="Schema Name..." bind:value={schemaName} />
				<TextInput invalid={errors.includes('tableName')} inline invalidText="Table Name is required" labelText="Table Name" placeholder="Table Name..." bind:value={tableName} />
				<TextArea rows={20} invalid={errors.includes('columns')} invalidText="Columns are required" labelText="Columns" placeholder="Past Columns & Column Types..." bind:value={columns} />
				<TextInput inline labelText="Primary Key" placeholder="Primary Key..." bind:value={primaryKey} />
				<TextInput inline labelText="Generated Key" placeholder="Generated Key..." bind:value={generatedKey} />
			</Column>
			<Column style="outline: 1px solid var(--cds-interactive-04)">
				<Button on:click={generateCode}>Generate</Button>
				<br>
				<br>
				{#if isCodeGenerated}
				<ContentSwitcher bind:selectedIndex>
					<Switch text="Entity Code" />
					<Switch text="Bean Code" />
					</ContentSwitcher>
					{#if selectedIndex === 0}<CodeSnippet type="multi" code={entityCode} />{/if}
					{#if selectedIndex === 1}<CodeSnippet type="multi" code={beanCode} />{/if}
				{/if}
			</Column>
		</Row>
	</Grid>
</div>

<style>
	.jpa-content {
		padding-top: 60px;
	}
</style>