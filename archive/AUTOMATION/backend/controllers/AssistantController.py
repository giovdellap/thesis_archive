from flask import request, jsonify

from api_reference.assistants.assistantsOrchestrator import AssistantOrchestrator


def create_assistant():
    try:
        if 'name' not in request.form or 'model' not in request.form:
            return jsonify({"message": "Name and model are required in the form-data"}), 400
        name = request.form['name']
        model = request.form['model']
        
        assistant = AssistantOrchestrator()
        assistant_id = AssistantOrchestrator.assistantCreation(assistant,name,model)
        return jsonify({"assistant_id": assistant_id}), 200
    except Exception as e:
        print("Exception: %s", e)
        return jsonify({"message": "An error occurred"}), 500
    

def get_list_assistants():
    try:      
        assistant = AssistantOrchestrator()
        list_assistants = AssistantOrchestrator.assistantListProvider(assistant)

        return jsonify({"list_assistants": list_assistants}), 200
    except Exception as e:
        print("Exception: %s", e)
        return jsonify({"message": "An error occurred"}), 500
    

def update_assistant(assistant_id):
    try:
        # if 'name' not in request.form or 'model' not in request.form:
        #     return jsonify({"message": "Name and model are required in the form-data"}), 400
        # name = request.form['name']
        # model = request.form['model']
        
        # assistant = AssistantOrchestrator()
        # assistant_id = AssistantOrchestrator.assistantUpdate(assistant,name,model)

        return jsonify({"message": f"Assistant {assistant_id} correctly updated"}), 200
    except Exception as e:
        print("Exception: %s", e)
        return jsonify({"message": "An error occurred"}), 500
    

def delete_assistant(assistant_id):
    try:
        
        assistant = AssistantOrchestrator()
        AssistantOrchestrator.assistantDelete(assistant,assistant_id)

        return jsonify({"message": f"Assistant {assistant_id} correctly deleted"}), 200
    except Exception as e:
        print("Exception: %s", e)
        return jsonify({"message": "An error occurred"}), 500