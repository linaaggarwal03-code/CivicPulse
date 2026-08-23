from fastapi import FastAPI
from routes.complaints import router as complaints_router

app = FastAPI()


@app.get("/health")
def health_check():
    return {"status": "healthy"}


app.include_router(complaints_router)