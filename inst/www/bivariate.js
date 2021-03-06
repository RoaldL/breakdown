var BivariateAnalysis = Backbone.Model.extend({
	defaults: {
		n:10,
		vars:[],
		output:null,
		flip:false,
		bivariate_result:null,
		base:null
	},
	initialize:function(){
		if(!this.get('output')) this.listenTo(this.get("base"),'change:output_var', 
			function(){this.set('output',this.get("base").get('output_var'));}, this);
		//bivariateCrossover is called if any of the attributes change
		this.on('change:n',this.bivariateCrossover,this);
		this.on('change:vars',this.bivariateCrossover,this);
		this.on('change:output',this.bivariateCrossover,this);
		this.listenTo(this.get("base"),'change:ranges', this.bivariateCrossover, this);
		this.listenTo(this.get("base"),'change:equations', this.bivariateCrossover, this);
		this.listenTo(this.get("base"),'change:scens',this.bivariateCrossover,this);		
	},
	bivariateCrossover: function(){
		if(!this.get("output")) return this;
		if(this.get("vars").length!=2) return this;
		var base=this.get("base");
		var biv=this;
		var ranges=base.getRanges(this.get("vars"),false);
		if(ranges.Variable.length===0) return this;
		
		console.log("bivariateCrossover");
		var req=ocpu.call("bivariateCrossover",{
				'equations.scen':base.selectEqns([base.get('scens')[1]]),
				'equations.baseline':base.selectEqns([base.get('scens')[0]]),
				'var':this.get("output"),
				ranges:ranges,
				n:this.get("n")
		},function(session){
			biv.set("bivariate_result",session);
		});
		req.fail(function(){
			$.messager.show({
					title:'Error',
					msg:req.responseText,
					timeout:5000,
					showType:'slide'
					});
			biv.set('bivariate_result',null);
		});		
	}
});

var BivOutputPlot = Backbone.View.extend({
    initialize: function(args){
		this.dirty=true;
		this.listenTo(this.model,'change:bivariate_result', this.actual_render, this);
		this.listenTo(this.model,'change:flip', this.actual_render, this);
		//TODO: changing Min,Max,Best should just involve new plot
		var obj=this;
		this.$el.resizable({onStopResize:function(){obj.actual_render();}});
	},
    render: function() {
		if(!this.$el.is(":visible")) return this;
		if(!this.dirty) return this; //don't rerun unless plot actually needs to change
		var pom=this.model.get("bivariate_result");
		if(!pom) return this;
		console.log("BivOutputPlot render");
		var ranges=this.model.get("base").getRanges(this.model.get("vars"),false);
		var scens=this.model.get("base").get("scens");
		var header=this.model.get("base").get("header");
		var req=this.$el.rplot("biplot",{
					'pom':pom,
					'ranges':ranges,
					'flip':this.model.get("flip"),
					'equations':this.model.get("base").selectEqns(this.model.get("base").get("scens")),
					'var':this.model.get("output"),
					'scens':[header[scens[0]],header[scens[1]]]
		});
		req.fail(function(){
		  console.log(req.responseText);
			$.messager.show({
					title:'Error',
					msg:req.responseText,
					timeout:5000,
					showType:'slide'
					});
		});
		var view=this;
		req.done(function(){
			view.dirty=false;
		});
		return this;
	},
	actual_render:function(){
		this.dirty=true;
		this.render();
	}
});

var BivRadioButtonTable = Backbone.View.extend({
	//model is a BivariateAnalysis
    initialize: function(args){
		this.listenTo(this.model.get("base"),'change:ranges',this.render,this);
		this.listenTo(this.model,'change:vars',this.setselected,this);
		this.inputId=this.$el.prop("id")+"_var1";
		this.inputId2=this.$el.prop("id")+"_var2";
		
		this.sliders=new RangeSliders({model:this.model.get("base"),el:this.$el,editRange:editRange_placeholder});
		//sliders will be updated on render here instead
		this.sliders.stopListening();
	},
	setselected:function(){
		this.$el.find('input[name="'+this.inputId+'"][value="' + 
			this.model.get('vars')[0] + '"]').prop('checked', true);
		this.$el.find('input[name="'+this.inputId2+'"][value="' + 
			this.model.get('vars')[1] + '"]').prop('checked', true);
	},
    render: function() {
		console.log("render BivRadioButtonTable");
		var model=this.model;
		var ranges=model.get("base").get('ranges');
		// Call template
		this.$el.empty().html(_.template($("#BivariateRadioButtonTable_template").html(),{
			ranges:ranges,
			inputId:this.inputId,
			inputId2:this.inputId2,
			id:this.$el.prop("id")
		}));
		this.sliders.render();
		//should be listenTo?
		this.$el.find("input:radio[name='"+this.inputId+"']").on('change',function(){
			model.set('vars',[this.value,model.get('vars')[1]]);});
		this.$el.find("input:radio[name='"+this.inputId2+"']").on('change',function(){
			model.set('vars',[model.get('vars')[0],this.value]);});
		this.setselected();
		return this;
	}
});

