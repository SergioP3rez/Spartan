import { Component, OnInit, Input, Output, EventEmitter } from 'angular2/core';
import { RouteParams } from 'angular2/router';

import { User } from '../../../models/user.model';

import { Comment } from '../../../models/comment2.model';
import { Task, newTask, setType } from '../../../models/task2.model';
import { Goal } from '../../../models/goal2.model';

import { GoalForm } from '../../../directives/goalForm/goal-form'
import { Diets } from '../../../directives/diets/diets'
import { CommentDirective } from '../../../directives/comments/comment.directive'

import { BeautifyProgessBarPipe, GoalNamePipe } from '../../../pipes/student-pipes.pipe';
import { AutenticacionService } from '../../../services/autenticacion.service';

declare var jQuery:JQueryStatic

@Component({
	selector: 'dashboard-alumno',
  templateUrl: 'app/components/dashboard/student-dashboard/student-dashboard.html',
	styleUrls: ['app/components/dashboard/student-dashboard/student-dashboard.css'],
  providers: [AutenticacionService],
	directives:  [GoalForm, CommentDirective, Diets],
  pipes: [BeautifyProgessBarPipe, GoalNamePipe],
	inputs: ['student']
})

export class DashboardAlumno implements OnInit{

	@Input()
	student: User;

	@Output()
  trainer_dashboard_event = new EventEmitter<any>();

	tab: number;				// Tab actual

	task: Task;					// Modelo de la nueva meta para el formulario

	taskFormType: number; // 0: no type ; 1 : aerobic ; 2 : anaerobic

	//DECLARACION DE VARIABLES PARA QUITAR jQuery

	posChanged:boolean;


	constructor(private aut: AutenticacionService) {
		this.tab = 1;
		this.posChanged = false; //Por si acaso, como no se donde se inicializa realmente
	}

	/*
	 *	Al iniciarse el componente, se cargaran las tareas que debe realizar el alumno
	 *  las cuales se obtienen a partir del id de su meta
   */

	ngOnInit(){
		this.task = newTask();
		this.posChanged = false;
	}

	/*
	 *	Método que permite volver al DashboardEntrenador
   */

	goBack() {
		this.trainer_dashboard_event.emit(null);
  }

	newGoal(){
		this.student.goal = null;
	}

	getGoal(goal: Goal){
		this.student.goal = goal;
		// AQUI SE GUARDA EN LA BASE DE DATOS (POST GOAL)
	}

	goalResponse(acepted:boolean){
		this.student.goal.acepted = acepted;
		this.student.goal.canceled = !acepted;
		// LLAMAR A GUARDAR
		if(this.aut.esProfesor() && !acepted){
			this.newGoal();
			this.goBack();
		}
	}

	saveTask(mode:boolean){
		if (mode){
			this.student.goal.tasks.push(this.task);
		  // AQUI SE LLAMARÁ A GUARDAR EN LA BDD (POST TASK)
		}
		this.task = newTask();
		// Para cerrar el dialog
		this.showDialog();
	}

	setType(type: number){
		this.task = setType(type, this.task);
		jQuery(".breadcrumb").hide();
		if (type) {
			jQuery("#form-aerobico").hide();
			jQuery("#form-anaerobico").show();
    }else{
      jQuery("#form-anaerobico").hide();
      jQuery("#form-aerobico").show();
    }
	}

	setTab(n:number){
		switch(n){
			case 1:	this.tab = 1;
							break;
			case 2: this.tab = 2;
							// Pone los comentarios de tu contraparte a leidos
							for (var comment of this.student.goal.comments){
								if(comment.rol != this.aut.User().roles[0] && !comment.read)
									comment.read = true;
							}
							//Llamar a guardar en la BDD (POST COMMENT)
							break;
			case 3: this.tab = 3;
							break;
		}
	}

	getNoReadComments(){
		var n = 0;
		for (var comment of this.student.goal.comments){
			if (!comment.read){
				if(comment.rol == "ROLE_STUDENT" && this.aut.esProfesor()){
					n++
				}else if(comment.rol == "ROLE_TRAINER" && this.aut.esAlumno()){
					n++
				}
			}
		}
		return n;
	}

	showDialog() {
	    //jQuery('#dialog-mat').toggleClass('position-changed');
			this.posChanged = !this.posChanged;
	    jQuery('.wrap').toggleClass('active'); //Activar y desactivar el dialog
	    jQuery('#blurizable').toggleClass('blur-backgorund change-style-blur'); //Activar y desactivar el fondo oscuro tras el dialog
	    jQuery('.boton-de-radio').prop('checked', false); //Desmarcar los radio-button de añadir tarea al pulsar Aceptar o Cancelar
	    jQuery("#form-anaerobico").hide();
	    jQuery("#form-aerobico").hide();
	    jQuery(".breadcrumb").show();

	    jQuery('html, body').animate({
	        scrollTop: jQuery("#dialog-mat").offset().top - 150
	    }, 250);

	    return false;
	}

	taskToPending(t){
		jQuery('#s'+t.id).trigger("click");
		t.status = 2;
	}

	colorlabel (e){
		  jQuery(e).toggleClass('add-color-label');
	}

	editTrigger(t) {
		jQuery("#edit-window-" + t.id).toggleClass("start-no-display");
		if (!(jQuery('#s' + t.id).is(':checked'))){
			jQuery("#edit-window-" + t.id).removeClass("start-no-display");
		 	jQuery('#s'+t.id).trigger("click");
	  }
	}

	saveEdit(t) {
		t.status = 0;
		this.editTrigger(t);
	}

	deleteTask(t){
		var x = this.student.goal.tasks.indexOf(t);
		this.student.goal.tasks.splice(x, 1);
	}
}
