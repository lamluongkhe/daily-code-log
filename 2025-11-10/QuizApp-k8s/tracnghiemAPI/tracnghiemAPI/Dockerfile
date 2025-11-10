# ===== Build stage =====
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src

# Copy solution file
COPY tracnghiemAPI.sln ./

# Copy project folder
COPY tracnghiemAPI/ ./tracnghiemAPI/

# Restore và publish
RUN dotnet restore tracnghiemAPI/tracnghiemAPI.csproj
RUN dotnet publish tracnghiemAPI/tracnghiemAPI.csproj -c Release -o /app/publish

# ===== Runtime stage =====
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
COPY --from=build /app/publish .
EXPOSE 5000
ENTRYPOINT ["dotnet", "tracnghiemAPI.dll"]

