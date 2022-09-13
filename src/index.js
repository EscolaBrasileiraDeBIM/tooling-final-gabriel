import { Color } from 'three';
import { projects } from "./projects.js";
import { IfcViewerAPI } from 'web-ifc-viewer';


const container = document.getElementById('viewer-container');
const viewer = new IfcViewerAPI({ container, backgroundColor: new Color(0xffffff) });
viewer.grid.setGrid();
viewer.axes.setAxes();
const currentUrl = window.location.href;
const url = new URL(currentUrl);
const id = url.searchParams.get("id");

const project = projects.find(project => project.id == id);

async function loadIfc(url) {
    await viewer.IFC.setWasmPath("./");
    const model = await viewer.IFC.loadIfcUrl(url);
    viewer.shadowDropper.renderShadow(model.modelID);
}

loadIfc(project.url);